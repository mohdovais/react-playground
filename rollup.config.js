/* global process */
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';
import autoprefixer from 'autoprefixer';

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;
const environment = production ? 'production' : 'development';

const plugins = [
    postcss({
        minimize: production,
        extract: true,
        plugins: [autoprefixer()],
    }),
    resolve({
        browser: true,
        extensions: ['.mjs', '.js', '.jsx', '.json'],
    }), // tells Rollup how to find date-fns in node_modules
    replace({
        'process.env.NODE_ENV': JSON.stringify(environment),
    }),
    babel({
        exclude: 'node_modules/**', // only transpile our source code
    }),
    commonjs(), // converts date-fns to ES modules
    production && terser(), // minify, but only in production
];

export default [
    {
        input: 'src/main.js',
        output: {
            file: 'dist/bundle.js',
            format: 'iife',
            name: 'app',
            sourcemap: true,
        },
        plugins,
    },
    {
        input: 'src/main.js',
        output: {
            file: 'dist/app.js',
            format: 'iife',
            name: 'app',
            sourcemap: true,
            globals: {
                react: 'React',
                ['react-dom']: 'ReactDOM'
            },
        },
        external: ['react', 'react-dom'],
        plugins,
    },
];
