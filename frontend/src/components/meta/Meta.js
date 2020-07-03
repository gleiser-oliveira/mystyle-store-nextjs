import Head from 'next/head';

const Meta = () => (
    <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1'/>
        <meta charSet='utf-8'/>
        <link rel='shortcut icon' href='/static/favicon.png'/>
        <link rel='stylesheet' type='text/css' href='/static/nprogress.css'/>
        <style>
            @import &rdquo;react-loader-spinner/dist/loader/css/react-spinner-loader.css&rdquo;;
            @import url(&rsquo;https://fonts.googleapis.com/css?family=Work+Sans&display=swap&rsquo;);
        </style>
        <title>My Style</title>
    </Head>
);

export default Meta;
