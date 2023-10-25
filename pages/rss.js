import sendAxios from 'utils/sendAxios';

function generateSiteMap(posts) {
    return `<rss xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
  <channel>
    <title>홍언니고기</title>
    <link>${process.env.DOMAIN}</link>
    <description>호주 대표 육가공 기업 Coles, John Dee 공식 수입업체</description>
    <language>ko</language>
    <pubDate>${new Date()}</pubDate>
    <generator>홍언니고기</generator>
    <atom:link href="${process.env.DOMAIN}/rss" rel="self" type="application/rss+xml"/>
    <image>
        <title>홍언니고기</title>
        <url>${process.env.AWS_IMAGE_URL}/images/logo.png</url>
        <link>${process.env.DOMAIN}</link>
        <description>호주 대표 육가공 기업 Coles, John Dee 공식 수입업체</description>
    </image>
     ${posts
         .map((post) => {
             if (post.product_id) {
                 return `
                    <item>
                        <title>${post.name}</title>
                        <link>${process.env.DOMAIN}/products/detailPage/${post.product_id}</link>
                        <description/>
                        <guid isPermaLink="true">${process.env.DOMAIN}/products/detailPage/${post.product_id}</guid>
                        <pubDate>${new Date()}</pubDate>
                    </item>
                `;
             }

             if (post.property_value === '공지사항') {
                 return `
                    <item>
                        <title>${post.title}</title>
                        <link>${process.env.DOMAIN}/notice</link>
                        <description>${post.content.replace(/&nbsp;|\<.+?>/g, '')}</description>
                        <guid isPermaLink="true">${process.env.DOMAIN}/notice</guid>
                        <pubDate>${new Date()}</pubDate>
                    </item>
                `;
             }

             return `
                <item>
                    <title>${post.title}</title>
                    <link>${process.env.DOMAIN}/oftenAsk</link>
                    <description>${post.content.replace(/&nbsp;|\<.+?>/g, '')}</description>
                    <guid isPermaLink="true">${process.env.DOMAIN}/oftenAsk</guid>
                    <pubDate>${new Date()}</pubDate>
                </item>
            `;
         })
         .join('')}
       </channel>
    </rss>
 `;
}

function Rss() {
    // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
    // We make an API call to gather the URLs for our site
    const config1 = {
        method: 'get',
        url: `${process.env.API_HOST}/product/list`,
        params: { limit: 50 }
    };
    const products = await sendAxios({ config: config1 });
    if (products.state === 'fail') {
        console.log(products.data.message);
        return;
    }

    const config2 = {
        method: 'get',
        url: `${process.env.API_HOST}/articles/list/notice`,
        params: { limit: 50 }
    };
    const notice = await sendAxios({ config: config2 });
    if (notice.state === 'fail') {
        console.log(notice.data.message);
        return;
    }

    const config3 = {
        method: 'get',
        url: `${process.env.API_HOST}/articles/list/support`,
        params: { limit: 50 }
    };
    const support = await sendAxios({ config: config3 });
    if (support.state === 'fail') {
        console.log(support.data.message);
        return;
    }

    const supportList = support.data.list.support;
    const allSupportList = Object.keys(supportList).reduce((tot, cur) => [...tot, ...supportList[cur]], []);

    const all_url = [...products.data.list, ...notice.data.list.notice[1], ...allSupportList];

    // We generate the XML sitemap with the posts data
    const rss = generateSiteMap(all_url);

    res.setHeader('Content-Type', 'text/xml');
    // we send the XML to the browser
    res.write(rss);
    res.end();

    return {
        props: {}
    };
}

export default Rss;
