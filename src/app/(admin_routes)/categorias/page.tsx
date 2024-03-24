import ClientCategory from "@/components/admin/ClientCategory";
import SmallContainer from "@/components/common/FormContainer";
import React from "react";
import * as queries from "@/queries";

async function CategoryAdminPage() {
  const categories = await queries.allCategories();

  return (
    <section>
      <SmallContainer>
        <ClientCategory categories={categories} />
      </SmallContainer>
    </section>
  );
}

export default CategoryAdminPage;
