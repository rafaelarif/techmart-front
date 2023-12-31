import Head from 'next/head';
import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductBox from "@/components/ProductBox";
import {mongooseConnect} from "@/lib/mongoose";
import {Category} from "@/models/Category";
import {Product} from "@/models/Product";
import styled from "styled-components";
import Link from "next/link";
import Footer from "@/components/Footer";

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

const CategoryTitle = styled.div`
  margin-top: 10px;
  margin-bottom: 0;
  display: flex;
  align-items: center;
  gap: 15px;
  h2 {
    margin-bottom: 10px;
    margin-top: 10px;
  }
  a {
    color: #555;
    display: inline-flex;
  }
`;

const CategoryWrapper = styled.div`
  margin-bottom: 40px;
`;

const ShowAllSquare = styled(Link)`
  background-color: #ddd;
  border-radius: 10px;
  height: 160px;
  align-items: center;
  display: flex;
  justify-content: center;
  color: #555;
  text-decoration: none;
`;

export default function CategoriesPage({
    mainCategories,
    categoriesProducts,
}) {
    return (
        <>
            <Head>
                <title>Categories - TechMart</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Header />
            <Center>
                {mainCategories.map((cat) => (
                    <CategoryWrapper key={cat._id}>
                        <CategoryTitle>
                            <h2>{cat.name}s</h2>
                            <div>
                                <Link href={"/category/" + cat._id}>Show All {cat.name}s</Link>
                            </div>
                        </CategoryTitle>
                        <CategoryGrid>
                            {categoriesProducts[cat._id].map((p, index) => (
                                <div key={index} delay={index * 50}>
                                    <ProductBox {...p} />
                                </div>
                            ))}
                            <div delay={categoriesProducts[cat._id].length * 50}>
                                <ShowAllSquare href={"/category/" + cat._id}>
                                    Show All &rarr;
                                </ShowAllSquare>
                            </div>
                        </CategoryGrid>
                    </CategoryWrapper>
                ))}
            </Center>
            <Footer />
        </>
    );
}

export async function getServerSideProps(ctx) {
    await mongooseConnect();
    const categories = await Category.find();
    const mainCategories = categories.filter((c) => !c.parent);
    const categoriesProducts = {};
    const allFetchedProductsId = [];
    for (const mainCat of mainCategories) {
        const mainCatId = mainCat._id.toString();
        const childCatIds = categories
            .filter((c) => c?.parent?.toString() === mainCatId)
            .map((c) => c._id.toString());
        const categoriesIds = [mainCatId, ...childCatIds];
        const products = await Product.find({category: categoriesIds}, null, {
            limit: 3,
            sort: {_id: -1},
        });
        allFetchedProductsId.push(...products.map((p) => p._id.toString()));
        categoriesProducts[mainCatId] = products;
    }

    return {
        props: {
            mainCategories: JSON.parse(JSON.stringify(mainCategories)),
            categoriesProducts: JSON.parse(JSON.stringify(categoriesProducts)),
        },
    };
}