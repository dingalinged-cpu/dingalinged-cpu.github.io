---
title: "How AI agents find businesses (and what they read when they do)"
slug: how-ai-agents-find-businesses
url: https://registry-edge.dingalinged.workers.dev/learn/how-ai-agents-find-businesses/
meta_description: "When an AI assistant or agent looks for a business, it searches the web, reads listings and directories, opens business websites and cross-checks facts. Here is the path, step by step, and what makes a business easy to pick."
primary_query: "how do AI agents find businesses"
secondary_queries: ["where does ChatGPT get business information", "what sources does AI use for local businesses", "how does AI find local businesses", "how do AI agents read websites"]
cluster: C16
direct_answer_words: 52
date_modified: 2026-10-18
status: published
author: Bryce Hoemann
date_published: 2026-10-18
---

# How AI agents find businesses (and what they read when they do)

*By Bryce Hoemann · Published October 18, 2026*

**Short answer:** Most AI assistants turn a request into a short web search, read the top listings, directories and business websites, then cross-check the facts before naming two to four businesses. Agents favor sources that are crawlable, current, consistent and structured, so a business with matching facts across many sources is easier to pick.

## The path, step by step

1. **The request becomes a search.** Local prompts are short ("electrician in Tulsa"). Nectiv found ChatGPT ran a web search on 59% of local-intent prompts, more than for other prompt types. Microsoft says Copilot generates a short search query, sends it to Bing, and uses the results to ground its answer.
2. **The agent reads a handful of sources.** These are usually listing data (Google Business Profile for Google's AI, Bing for Copilot), large directories and review sites (Yelp is ChatGPT's most-used local source, per BrightLocal), and business websites: about 93% of the domains BrightLocal saw cited were individual business sites.
3. **It cross-checks.** If your hours say one thing on your website and another on a directory, that is a reason to pick someone else.
4. **It writes a short list.** BrightLocal's 200,085-prompt study found a median of 2 to 4 businesses per answer.
5. **The user checks.** Yext's 2026 survey found that after an AI recommendation, 53% search Google or Bing and 49% visit the business's website.

## What different agents read

| Agent | Main business data | Notes |
|---|---|---|
| Google AI Overviews / AI Mode | Google's index and Google Business Profile | Google says there are no extra technical requirements beyond normal indexing |
| Microsoft Copilot | Bing index and Bing Places | Copilot grounds answers in Bing results |
| ChatGPT | Web search plus pages its crawlers fetch | Yelp appeared in 80% of its local answers (BrightLocal) |
| Perplexity | Live web search | Reddit was its most-cited source overall (Profound) |

## What makes a business easy to pick

- **Crawlable**: no robots.txt blocks on AI crawlers, fast plain-HTML pages.
- **Consistent**: the same name, address, phone and services everywhere.
- **Current**: updated hours and prices, recent reviews.
- **Structured**: facts an agent can parse without guessing, such as schema.org data, JSON and clean tables.

## Why we built Company Registry

Company Registry publishes each business as plain HTML with schema.org data, a markdown copy and JSON, and answers questions like "best roofers in Austin, TX" in a fixed, machine-readable format. Every record names its source. When owner claiming opens, owner-supplied facts will be marked as owner-stated, and sponsored spots, once offered, will be labeled. We also measure which AI crawlers visit and what they ask for; we will publish aggregate findings as the data grows.

## Frequently asked questions

### Where does ChatGPT get information about local businesses?

From web search results and the pages its crawlers fetch, including listings, directories, review sites and business websites. It does not have a submission form for businesses.

### Do AI agents read schema markup?

Many agents parse structured data when it is present. It helps them read facts without guessing, though studies find it is not a strong ranking signal on its own.

### Do AI agents use Google Business Profile?

Google's own AI features rely heavily on it. BrightLocal found Google's AI used Google Business Profile for virtually every location it described. Other assistants rely more on their own search partners and directories.

### How many businesses does an AI recommend per answer?

Usually only a few. BrightLocal's study found a median of 2 to 4 businesses, with ChatGPT averaging about 4.

## Get your business in front of AI agents

Company Registry lists US businesses in a format AI agents can read: plain HTML with schema.org data, a markdown copy and JSON, with the source of every fact named. **Look up your business:** open the ranked list for your service and city, for example [dentists in Minneapolis, MN](https://registry-edge.dingalinged.workers.dev/k/dentist-minneapolis-mn/) or [plumbers in Kansas City, MO](https://registry-edge.dingalinged.workers.dev/k/plumber-kansas-city-mo/). Free owner claiming, so you can add what you want agents to know, is coming soon.

## Sources

- BrightLocal, local AI visibility study (200,085 localized prompts): https://www.brightlocal.com/research/local-ai-visibility-study/
- BrightLocal, where AI gets local business information (Aug 2026): https://www.brightlocal.com/resources/ai-directory-sources/
- Yext, Consumer search behaviors report 2026: https://www.yext.com/resources/consumer-search-behaviors-full-report
- Google Search Central, AI features and your website: https://developers.google.com/search/docs/appearance/ai-features
- Microsoft Learn, Data, privacy and security for web search in Microsoft Copilot (Copilot sends generated queries to Bing): https://learn.microsoft.com/en-us/microsoft-365/copilot/manage-public-web-access
- Microsoft Bing, Copilot Search FAQ (grounded on Bing search results): https://www.microsoft.com/bing/copilot-search
- Profound, AI platform citation patterns: https://www.tryprofound.com/blog/ai-platform-citation-patterns
- Nectiv, what queries ChatGPT uses behind the scenes: https://nectivdigital.com/blog/new-data-study-what-queries-is-chatgpt-using-behind-the-scenes

## Related guides

- https://registry-edge.dingalinged.workers.dev/learn/ai-assistant-business-sources/
- https://registry-edge.dingalinged.workers.dev/learn/business-directory-for-ai-agents/
- https://registry-edge.dingalinged.workers.dev/learn/get-recommended-by-chatgpt/
- https://registry-edge.dingalinged.workers.dev/learn/how-to-advertise-to-ai/

