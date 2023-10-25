import sendAxios from 'utils/sendAxios';

function generateSiteMap(posts) {
    return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
     ${posts
         .map((url) => {
             return `
       <url>
           <loc>${url}</loc>
       </url>
     `;
         })
         .join('')}
   </urlset>
 `;
}

function SiteMap() {
    // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res, params }) {
    const product_id = params.id;

    // We make an API call to gather the URLs for our site
    const config = {
        method: 'get',
        url: `${process.env.API_HOST}/product/reviews`,
        params: { product_id }
    };

    const products = await sendAxios({ config });

    if (products.state === 'fail') {
        console.log(products.data.message);
        return;
    }

    const products_url = products.data.list.map((list) => `${process.env.DOMAIN}/photoReview/photoReviewDetail/${list.idx}`);

    // We generate the XML sitemap with the posts data
    const sitemap = generateSiteMap(products_url);

    res.setHeader('Content-Type', 'text/xml');
    // we send the XML to the browser
    res.write(sitemap);
    res.end();

    return {
        props: {}
    };
}

export default SiteMap;
