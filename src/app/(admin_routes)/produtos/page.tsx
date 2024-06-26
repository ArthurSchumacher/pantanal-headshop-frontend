import SmallContainer from "@/components/common/SmallContainer";
import React from "react";
import * as queries from "@/queries";
import ClientProduct from "@/components/admin/product/ClientProduct";

async function ProductAdminPage() {
  const products = await queries.allProducts(undefined, undefined, "100", "1");

  return (
    <section>
      <SmallContainer>
        <ClientProduct products={products} />
      </SmallContainer>
    </section>
  );
}

export default ProductAdminPage;
