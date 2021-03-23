rm -rf dist &&
parcel build src/index.html --no-minify --public-url ./ &&
git add . &&
git commit -m 'update' &&
 git push origin