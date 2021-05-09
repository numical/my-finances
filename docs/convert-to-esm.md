

* rename all files .js > .mjs:  
`find . -name "*.js" -exec sh -c 'mv "$0" "${0%.js}.mjs"' {} \;`
