module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },

    "extends": "eslint:recommended",

    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "module"
            }
        }
    ],

    "parserOptions": {
        "ecmaVersion": "latest"
    },

    "rules": {
        "no-var": "error"
    }
}
