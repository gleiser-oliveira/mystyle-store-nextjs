module.exports = {
    "env": {
        "browser": true,
        "es2020": true,
        "node": true,
        "jest": true,
    },
    "extends": [
        "plugin:react/recommended",
        "standard"
    ],
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 11,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "indent": ["error", 4],
        "curly": ["error", "multi"],
        "semi": ["error", "always"],
        "comma-dangle": ["error", "only-multiline"],
        "space-before-function-paren": ["error", "never"],
        "react/react-in-jsx-scope": "off",
    },
    "settings": {
        "react": {
            "version": "detect",
        }
    },
};
