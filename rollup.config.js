/* global process */
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';
import autoprefixer from 'autoprefixer';
import esbuild from 'rollup-plugin-esbuild';
import { generateScopedName } from './scripts/css-module-scoped-name';

const production = !process.env.ROLLUP_WATCH;
const environment = production ? 'production' : 'development';

export default [
    {
        input: 'src/app.tsx',
        output: {
            dir: 'dist',
            format: 'esm',
            sourcemap: true,
        },
        manualChunks(id) {
            if (id.includes('node_modules')) {
                return 'vendor';
            } else if (id.includes('packages')) {
                return 'framework';
            }
        },
        plugins: [
            postcss({
                minimize: production,
                extract: true,
                sourceMap: true,
                namedExports: function (name) {
                    return name.replace(/-/g, '_');
                },
                modules: {
                    generateScopedName: production
                        ? generateScopedName('x-')
                        : '[name]__[local]___[hash:base64:5]',
                },
                plugins: [autoprefixer()],
            }),
            resolve({
                browser: true,
                extensions: ['.mjs', '.js', '.jsx', '.json'],
            }),
            replace({
                'process.env.NODE_ENV': JSON.stringify(environment),
            }),
            commonjs(),
            esbuild({ target: 'es2015' }),
            production && terser(),
        ],
    },
];
