import sendAxios from 'utils/sendAxios';

function generateSiteMap(products, events) {
    return `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <sitemap>
        <loc>${process.env.DOMAIN}/sitemap/main</loc>
      </sitemap>
      <sitemap>
        <loc>${process.env.DOMAIN}/sitemap/events</loc>
      </sitemap>
      ${products
          .map((product) => {
              return `
            <sitemap>
            <loc>${process.env.DOMAIN}/sitemap/${product.product_id}</loc>
          </sitemap>
    `;
          })
          .join('')}
    </sitemapindex>
 `;
}

function SiteMap() {
    // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
    // We make an API call to gather the URLs for our site
    const config = {
        method: 'get',
        url: `${process.env.API_HOST}/product/list`,
        params: { limit: 100 }
    };
    const products = await sendAxios({ config });
    if (products.state === 'fail') {
        console.log(products.data.message);
        return;
    }

    // We generate the XML sitemap with the posts data
    const sitemap = generateSiteMap(products.data.list);

    res.setHeader('Content-Type', 'text/xml');
    // we send the XML to the browser
    res.write(sitemap);
    res.end();

    return {
        props: {}
    };
}

export default SiteMap;
