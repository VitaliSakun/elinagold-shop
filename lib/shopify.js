const domain = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN || process.env.SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_TOKEN || process.env.SHOPIFY_STOREFRONT_TOKEN;

// Server-seitige Queries (gecacht, 60s)
async function shopifyQuery(query, variables = {}) {
  const response = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 },
  });
  if (!response.ok) throw new Error(`Shopify API error: ${response.status}`);
  return await response.json();
}

// Client-seitige Mutations (kein Cache)
async function shopifyMutation(query, variables = {}) {
  const response = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
    },
    body: JSON.stringify({ query, variables }),
    cache: 'no-store',
  });
  if (!response.ok) throw new Error(`Shopify Mutation error: ${response.status}`);
  return await response.json();
}

// ─── Cart Fragment (inline) ────────────────────────────────────────────────
const CART_FIELDS = `
  id
  checkoutUrl
  totalQuantity
  cost {
    totalAmount { amount currencyCode }
    subtotalAmount { amount currencyCode }
  }
  lines(first: 30) {
    edges {
      node {
        id
        quantity
        cost { totalAmount { amount currencyCode } }
        merchandise {
          ... on ProductVariant {
            id
            title
            price { amount currencyCode }
            compareAtPrice { amount currencyCode }
            product {
              title
              handle
              images(first: 1) { edges { node { url altText } } }
            }
          }
        }
      }
    }
  }
`;

// ─── Cart API ──────────────────────────────────────────────────────────────

export async function createCart(lines = []) {
  const query = `
    mutation CreateCart($lines: [CartLineInput!]) {
      cartCreate(input: { lines: $lines }) {
        cart { ${CART_FIELDS} }
        userErrors { field message }
      }
    }
  `;
  const res = await shopifyMutation(query, { lines });
  return res.data?.cartCreate?.cart || null;
}

export async function addCartLines(cartId, lines) {
  const query = `
    mutation AddCartLines($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart { ${CART_FIELDS} }
        userErrors { field message }
      }
    }
  `;
  const res = await shopifyMutation(query, { cartId, lines });
  return res.data?.cartLinesAdd?.cart || null;
}

export async function updateCartLine(cartId, lineId, quantity) {
  const query = `
    mutation UpdateCartLine($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart { ${CART_FIELDS} }
        userErrors { field message }
      }
    }
  `;
  const res = await shopifyMutation(query, { cartId, lines: [{ id: lineId, quantity }] });
  return res.data?.cartLinesUpdate?.cart || null;
}

export async function removeCartLines(cartId, lineIds) {
  const query = `
    mutation RemoveCartLines($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart { ${CART_FIELDS} }
        userErrors { field message }
      }
    }
  `;
  const res = await shopifyMutation(query, { cartId, lineIds });
  return res.data?.cartLinesRemove?.cart || null;
}

// ─── Products ──────────────────────────────────────────────────────────────

export async function getProducts(first = 8) {
  const query = `
    query GetProducts($first: Int!) {
      products(first: $first, query: "available_for_sale:true") {
        edges {
          node {
            id
            title
            handle
            availableForSale
            productType
            tags
            priceRange {
              minVariantPrice { amount currencyCode }
            }
            compareAtPriceRange {
              minVariantPrice { amount currencyCode }
            }
            images(first: 2) {
              edges { node { url altText } }
            }
            options {
              name
              values
            }
          }
        }
      }
    }
  `;
  const res = await shopifyQuery(query, { first });
  return res.data?.products?.edges || [];
}

export async function getProduct(handle) {
  const query = `
    query GetProduct($handle: String!) {
      product(handle: $handle) {
        id
        title
        handle
        description
        descriptionHtml
        vendor
        productType
        tags
        availableForSale
        priceRange {
          minVariantPrice { amount currencyCode }
          maxVariantPrice { amount currencyCode }
        }
        compareAtPriceRange {
          minVariantPrice { amount currencyCode }
        }
        options {
          name
          values
        }
        images(first: 10) {
          edges { node { url altText width height } }
        }
        variants(first: 30) {
          edges {
            node {
              id
              title
              availableForSale
              price { amount currencyCode }
              compareAtPrice { amount currencyCode }
              selectedOptions { name value }
              quantityAvailable
            }
          }
        }
        collections(first: 3) {
          edges { node { handle title } }
        }
      }
    }
  `;
  const res = await shopifyQuery(query, { handle });
  return res.data?.product || null;
}

// ─── Collections ──────────────────────────────────────────────────────────

export async function getCollection(handle) {
  const query = `
    query GetCollection($handle: String!) {
      collection(handle: $handle) {
        id
        title
        handle
        description
        image { url altText }
        products(first: 24) {
          edges {
            node {
              id
              title
              handle
              availableForSale
              priceRange {
                minVariantPrice { amount currencyCode }
              }
              compareAtPriceRange {
                minVariantPrice { amount currencyCode }
              }
              images(first: 2) {
                edges { node { url altText } }
              }
              options {
                name
                values
              }
            }
          }
        }
      }
    }
  `;
  const res = await shopifyQuery(query, { handle });
  const collection = res.data?.collection || null;
  if (collection) {
    collection.products.edges = collection.products.edges.filter(
      (e) => e.node.availableForSale !== false
    );
  }
  return collection;
}

export async function getCollections() {
  const query = `
    {
      collections(first: 15) {
        edges {
          node {
            id
            title
            handle
            image { url altText }
            products(first: 1) {
              edges {
                node {
                  images(first: 1) {
                    edges { node { url altText } }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
  const res = await shopifyQuery(query);
  return res.data?.collections?.edges || [];
}

export async function getAllProductHandles() {
  const query = `
    { products(first: 250) { edges { node { handle } } } }
  `;
  const res = await shopifyQuery(query);
  return res.data?.products?.edges?.map((e) => e.node.handle) || [];
}

export async function searchProducts(query, first = 12) {
  const gql = `
    query SearchProducts($query: String!, $first: Int!) {
      products(first: $first, query: $query) {
        edges {
          node {
            id
            title
            handle
            availableForSale
            priceRange {
              minVariantPrice { amount currencyCode }
            }
            compareAtPriceRange {
              minVariantPrice { amount currencyCode }
            }
            images(first: 2) {
              edges { node { url altText } }
            }
            options {
              name
              values
            }
          }
        }
      }
    }
  `;
  const res = await shopifyQuery(gql, { query, first });
  return res.data?.products?.edges?.map((e) => e.node).filter((p) => p.availableForSale !== false) || [];
}

export async function getAllCollectionHandles() {
  const query = `
    { collections(first: 50) { edges { node { handle } } } }
  `;
  const res = await shopifyQuery(query);
  return res.data?.collections?.edges?.map((e) => e.node.handle) || [];
}
