import Head from 'next/head';
import Header from "@/components/Header";
import Center from "@/components/Center";
import {Category} from "@/models/Category";
import {Product} from "@/models/Product";
import ProductsGrid from "@/components/ProductsGrid";
import styled from "styled-components";
import {useEffect, useState} from "react";
import axios from "axios";
import Spinner from "@/components/Spinner";
import Footer from "@/components/Footer";
import ReactSelect from 'react-select';

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  h1 {
    font-size: 1.5em;
  }
`;
const FiltersWrapper = styled.div`
  color: #444;
  display: flex;
  gap: 15px;
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

function getLabelForValue(value) {
    switch (value) {
        case "price-asc":
            return "Lowest Price";
        case "price-desc":
            return "Highest Price";
        case "_id-desc":
            return "Newest";
        case "_id-asc":
            return "Oldest";
        default:
            return "";
    }
}

export default function CategoryPage({
    category,
    subCategories,
    products: originalProducts,
}) {
    const defaultSorting = "_id-desc";
    const defaultFilterValues = category.properties.map((p) => ({
        name: p.name,
        value: "all",
    }));
    const [products, setProducts] = useState(originalProducts);
    const [filtersValues, setFiltersValues] = useState(defaultFilterValues);
    const [sort, setSort] = useState(defaultSorting);
    const [loadingProducts, setLoadingProducts] = useState(false);
    const [filtersChanged, setFiltersChanged] = useState(false);

    function handleFilterChange(filterName, filterValue) {
        setFiltersValues((prev) => {
            return prev.map((p) => ({
                name: p.name,
                value: p.name === filterName ? filterValue : p.value,
            }));
        });
        setFiltersChanged(true);
    }
    useEffect(() => {
        if (!filtersChanged) {
            return;
        }
        setLoadingProducts(true);
        const catIds = [category._id, ...(subCategories?.map((c) => c._id) || [])];
        const params = new URLSearchParams();
        params.set("categories", catIds.join(","));
        params.set("sort", sort);
        filtersValues.forEach((f) => {
            if (f.value !== "all") {
                params.set(f.name, f.value);
            }
        });
        const url = `/api/products?` + params.toString();
        axios.get(url).then((res) => {
            setProducts(res.data);
            setLoadingProducts(false);
        });
    }, [filtersValues, sort, filtersChanged]);
    return (
        <>
            <Head>
                <title>Cart - TechMart</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Header />
            <Center>
                <CategoryHeader>
                    <h1>{category.name}s</h1>
                    <FiltersWrapper>
                        {category.properties.map((prop) => (
                            <Filter key={prop.name}>
                                <span>{prop.name}:</span>
                                <ReactSelect
                                    styles={{
                                        control: (provided) => ({...provided, height: 40, minHeight: 40, width: 150, minWidth: 150}),
                                        option: (provided) => ({...provided, padding: 20}),
                                    }}
                                    options={[
                                        {value: 'all', label: 'All'},
                                        ...prop.values.map(val => ({value: val, label: val}))
                                    ]}
                                    onChange={(selectedOption) =>
                                        handleFilterChange(prop.name, selectedOption.value)
                                    }
                                    value={{
                                        value: filtersValues.find(f => f.name === prop.name).value,
                                        label: filtersValues.find(f => f.name === prop.name).value === 'all' ? 'All' : filtersValues.find(f => f.name === prop.name).value
                                    }}
                                />
                            </Filter>
                        ))}
                        <Filter>
                            <span>Sort By:</span>
                            <ReactSelect
                                styles={{
                                    control: (provided) => ({...provided, height: 40, minHeight: 40, width: 150, minWidth: 150}),
                                    option: (provided) => ({...provided, padding: 20}),
                                }}
                                options={[
                                    {value: "price-asc", label: "Lowest Price"},
                                    {value: "price-desc", label: "Highest Price"},
                                    {value: "_id-desc", label: "Newest"},
                                    {value: "_id-asc", label: "Oldest"}
                                ]}
                                onChange={(selectedOption) => {
                                    setSort(selectedOption.value);
                                    setFiltersChanged(true);
                                }}
                                value={{value: sort, label: getLabelForValue(sort)}}
                            />
                        </Filter>
                    </FiltersWrapper>

                </CategoryHeader>
                {loadingProducts && <Spinner fullWidth />}
                {!loadingProducts && (
                    <div>
                        {products.length > 0 && <ProductsGrid products={products} />}
                        {products.length === 0 && <div>Sorry, no products found</div>}
                    </div>
                )}
            </Center>
            <Footer />
        </>
    );
}

export async function getServerSideProps({params}) {
    const category = await Category.findById(params.id);
    const subCategories = await Category.find({parent: category._id});
    const catIds = [category._id, ...subCategories.map((c) => c._id)];
    const products = await Product.find({category: catIds});

    return {
        props: {
            category: JSON.parse(JSON.stringify(category)),
            subCategories: JSON.parse(JSON.stringify(subCategories)),
            products: JSON.parse(JSON.stringify(products)),
        },
    };
}