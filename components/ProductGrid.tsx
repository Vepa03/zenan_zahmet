"use client"

import { useState } from "react"
import HomeTabBar from "./HomeTabBar";


const ProductGrid = () => {
    const [products, setProduct] = useState([]);
    const [loading, setloading ] = useState(false);
    const [selectedTab, setSelectedTab ] = useState("");
  return (
    <div>
      <HomeTabBar/>
    </div>
  )
}

export default ProductGrid
