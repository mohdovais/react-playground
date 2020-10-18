/* global process */
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
//import replace from '@rollup/plugin-replace';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';
import autoprefixer from 'autoprefixer';
import esbuild from 'rollup-plugin-esbuild';

const production = !process.env.ROLLUP_WATCH;
const environment = production ? 'production' : 'development';

export default [
    {
        input: 'src/main.tsx',
        output: {
            file: 'dist/app.umd.js',
            format: 'umd',
            name: 'app',
            sourcemap: true,
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
            /*
            replace({
                'process.env.NODE_ENV': JSON.stringify(environment),
            }),
            */
            commonjs(),
            esbuild({ target: 'es2015' }),
            production && terser(),
        ],
    },
];
