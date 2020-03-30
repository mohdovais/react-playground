/* global process */
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from 'rollup-plugin-babel';
import replace from '@rollup/plugin-replace';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';
import autoprefixer from 'autoprefixer';

const production = !process.env.ROLLUP_WATCH;
const environment = production ? 'production' : 'development';

export default [
    {
        input: 'src/main.js',
        output: {
            file: 'dist/app.umd.js',
            format: 'umd',
            name: 'app',
            sourcemap: production,
            globals: {
                react: 'React',
                'react-dom': 'ReactDOM',
            },
        },
        external: ['react', 'react-dom'],
        plugins: [
            postcss({
                minimize: production,
                extract: true,
                namedExports: function (name) {
                    return name.replace(/-/g, '_');
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
            babel({
                exclude: 'node_modules/**', // only transpile our source code
            }),
            commonjs(),
            production && terser(),
        ],
    },
];
