import webpack from 'webpack';
import config from './fixture/webpack.config';

webpack(config).run((err, stats) => {
    if (err) {
        console.error('Error', err);
        return;
    }
    if (stats.hasErrors()) {
        console.error('compilation errors:', stats.compilation.errors);
        return;
    }
    console.log('Finished');
});
