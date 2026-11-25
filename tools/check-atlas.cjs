// See tools/README.md for the optional Chromium dependency.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { chromium } = require('playwright');

const assets = path.resolve(__dirname, '../assets');
const bake = process.argv.includes('--bake');
const sizes = [['atlas-signature',1020,336],['atlas-signature-mobile',480,454],['conflation-results',540,151]];

(async () => {
  const browser = await chromium.launch(process.env.CHROME_CHANNEL ? {channel:process.env.CHROME_CHANNEL} : {});
  try {
    for (const [name,width,height] of sizes) {
      const page = await browser.newPage({viewport:{width,height},reducedMotion:'reduce',deviceScaleFactor:2});
      await page.goto(pathToFileURL(path.join(assets, name+'.svg')).href);
      const labels = await page.locator('text').evaluateAll(nodes => {
        // Use ink bounds: adjacent display lines can share font leading without touching.
        const ctx = document.createElementNS('http://www.w3.org/1999/xhtml','canvas').getContext('2d');
        return nodes.map(node => {
          const style = getComputedStyle(node);
          ctx.font = [style.fontStyle,style.fontWeight,style.fontSize,style.fontFamily].join(' ');
          const m=ctx.measureText(node.textContent), x=node.x.baseVal[0].value, y=node.y.baseVal[0].value;
          const p=(a,b)=>new DOMPoint(a,b).matrixTransform(node.getScreenCTM());
          const l=p(x-m.actualBoundingBoxLeft,y-m.actualBoundingBoxAscent), r=p(x+m.actualBoundingBoxRight,y+m.actualBoundingBoxDescent);
          return {text:node.textContent,left:l.x,right:r.x,top:l.y,bottom:r.y};
        });
      });
      for(const [i,a] of labels.entries()) {
        assert.ok(a.left>=0 && a.right<=width && a.top>=0 && a.bottom<=height, 'Clipped: '+a.text);
        for(const b of labels.slice(i+1)) assert.ok(a.right<=b.left || b.right<=a.left || a.bottom<=b.top || b.bottom<=a.top, 'Overlap: '+a.text+' / '+b.text);
      }
      if(name.startsWith('atlas-signature')) {
        const scene = await page.locator('g:has(> .rebuild)').first().boundingBox();
        assert.ok(scene && scene.x>0 && scene.y>0 && scene.x+scene.width<width && scene.y+scene.height<height);
        for(const a of labels) assert.ok(a.right<=scene.x || a.left>=scene.x+scene.width || a.bottom+6<=scene.y || a.top>=scene.y+scene.height+6, 'Scene overlaps: '+a.text);
        assert.equal(await page.evaluate(()=>document.getAnimations().length),0);
        const still = await page.screenshot();
        const png = path.join(assets,name+'.png');
        if (bake) fs.writeFileSync(png,still);
        else assert.ok(fs.existsSync(png),'Missing reduced-motion PNG: '+name);
        await page.emulateMedia({reducedMotion:'no-preference'});
        const frame = async t => {
          await page.evaluate(ms=>document.getAnimations().forEach(a=>{a.pause();a.currentTime=ms}), t);
          return page.screenshot();
        };
        assert.notDeepEqual(await frame(0), await frame(3300), 'No motion: '+name);
      }
      console.log(name+': bounds and labels OK');
      await page.close();
    }
  } finally { await browser.close(); }
})().catch(e=>{ console.error(e.message);process.exitCode=1; });
