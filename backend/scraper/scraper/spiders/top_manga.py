import scrapy


class TopMangaSpider(scrapy.Spider):
    name = "top-manga"
    allowed_domains = ["myanimelist.net"]
    start_urls = ["https://myanimelist.net/topmanga.php"]

    def parse(self, response):
        elements = response.css('a.hoverinfo_trigger.fw-b::attr(href)').getall()
        for link in elements:
            yield scrapy.Request(
                response.urljoin(link),
                self.getInfo
            )

        pagination_link = response.css('.link-blue-box.next::attr(href)').get()
        if pagination_link:
            scrapy.Request(
                response.urljoin(link),
                self.parse
            )

        # after doing the similarity algo, then come back and get published date, authors, etc.
    def getInfo(self, response):
        title = response.css('span[itemprop="name"]::text').get()
        # desc = response.css('[itemprop = "description"]::text').get()
        details = response.css('.leftside .spaceit_pad [itemprop = "genre"]::text').getall()

        print(title,': ', details)
