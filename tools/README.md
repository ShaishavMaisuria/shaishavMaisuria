# Profile artwork

`node tools/build-atlas.mjs` rebuilds the self-contained SVGs. The city is an illustrative survey tile, not a rendering of MapScout output. The footprints define both the point samples and the shaded buildings. The chart uses the OpenStreetMap/Overture benchmark linked in the profile.

To bake the reduced-motion PNGs or check label bounds and animation with Chromium:

```sh
deps=$(mktemp -d)
npm install --prefix "$deps" playwright
"$deps/node_modules/.bin/playwright" install chromium
NODE_PATH="$deps/node_modules" node tools/check-atlas.cjs --bake
```

Omit `--bake` to check without changing files. Set `CHROME_CHANNEL=chrome` to use an installed Chrome instead of downloading Chromium.
