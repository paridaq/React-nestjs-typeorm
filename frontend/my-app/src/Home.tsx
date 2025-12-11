"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Trash2, Edit2, Check, X, } from "lucide-react"
import "./App.css"
import { useNavigate } from "react-router"

interface Product {
  id: string
  productname: string
  productprice: string
  productavalible: string
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [formData, setFormData] = useState({ productname: "", productprice: "", productavalible: "" })
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editData, setEditData] = useState({ productname: "", productprice: "", productavalible: "" })
  const navigate  = useNavigate();
  const username = localStorage.getItem("username")

useEffect(()=>{
  async function getallproducts(){
    try {
      const res = await fetch("http://localhost:3001/product/products");
      const result = await res.json();
      setProducts(result)
    } catch (error) {
      console.log(error)
    }
  }
  getallproducts()
  
},[])

  const handleAddProduct = async(e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res= await fetch("http://localhost:3001/product/addproduct",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
       
        body:JSON.stringify({
          productname: formData.productname,
          productprice: formData.productprice,
          productavalible: formData.productavalible
        })
      })
      if(res.ok){
        const result = await res.json();
        setProducts([...products, result])
        setFormData({ productname: "", productprice: "", productavalible: "" })
        console.log(result);
      }
    } catch (error) {
      console.log(error)
    }
    // if (formData.name && formData.price && formData.availability) {
    
      
    //   setFormData({ name: "", price: "", availability: "" })
    // }
  }

 const handleDelete = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:3001/product/${id}`, {
      method: "DELETE"
    })

    if (res.ok) {
      
      setProducts(products.filter((p) => p.id !== id))
    } else {
      console.error("Failed to delete product")
    }
  } catch (error) {
    console.log(error)
  }
}

  const handleEdit = (product: Product) => {
    setEditingId(product.id)
    setEditData({ productname: product.productname, productprice: product.productprice, productavalible: product.productavalible })
  }

  const  handleSaveEdit = async(id: string) => {

   try {
    const res = await fetch(`http://localhost:3001/product/${id}`,{
      method:"PATCH",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        productname:editData.productname,
        productprice:editData.productprice,
        productavalible:editData.productavalible
      })

    })
    if(res.ok){
     setProducts(
      products.map((p) =>
        p.id === id ? { ...p, productname: editData.productname, productprice: editData.productprice, productavalible: editData.productavalible } : p,
      ),
    )
    setEditingId(null)
    setEditData({ productname: "", productprice: "", productavalible: "" })
  }
   } catch (error) {
    console.log(error)
   }
  }

  return (
    <div className="container">
      {/* Header */}
      <h1>welcome </h1>
      {username && <h3>{username}</h3>}

      <header className="header">
        <div className="header-content">
          <div className="header-brand">
            <div className="brand-logo">P</div>
            <h1 className="brand-name">TechStore</h1>
          </div>
          <nav className="nav-links">
            <a href="register" className="nav-link" onClick={()=>navigate("/register")}>
              Register
            </a>
            <button className="nav-button" onClick={()=>navigate("/login")}>Login</button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <div className="content-grid">
          {/* Form Section */}
          <div className="form-section">
            <div className="form-card">
              <h2 className="form-title">Add New Product</h2>
              <form onSubmit={handleAddProduct} className="form">
                <div className="form-group">
                  <label className="form-label">Product Name</label>
                  <input
                    type="text"
                    value={formData.productname}
                    onChange={(e) => setFormData({ ...formData, productname: e.target.value })}
                    placeholder="Enter product name"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Price</label>
                  <input
                    type="text"
                    value={formData.productprice}
                    onChange={(e) => setFormData({ ...formData, productprice: e.target.value })}
                    placeholder="Enter price"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Availability</label>
                  <input
                    type="text"
                    value={formData.productavalible}
                    onChange={(e) => setFormData({ ...formData, productavalible: e.target.value })}
                    placeholder="e.g., In Stock, Out of Stock"
                    className="form-input"
                  />
                </div>

                <button type="submit" className="submit-button">
                  Submit
                </button>
              </form>
            </div>
          </div>

          {/* Table Section */}
          <div className="table-section">
            <div className="table-card">
              <div className="table-header">
                <h2 className="table-title">Product List</h2>
              </div>

              {products.length === 0 ? (
                <div className="empty-state">
                  <p>No products added yet. Add your first product to get started!</p>
                </div>
              ) : (
                <div className="table-wrapper">
                  <table className="products-table">
                    <thead>
                      <tr className="table-head-row">
                        <th className="table-header-cell">Product Name</th>
                        <th className="table-header-cell">Price</th>
                        <th className="table-header-cell">Availability</th>
                        <th className="table-header-cell">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) =>
                        editingId === product.id ? (
                          <tr key={product.id} className="table-row editing-row">
                            <td className="table-cell">
                              <input
                                type="text"
                                value={editData.productname}
                                onChange={(e) => setEditData({ ...editData, productname: e.target.value })}
                                className="edit-input"
                              />
                            </td>
                            <td className="table-cell">
                              <input
                                type="text"
                                value={editData.productprice}
                                onChange={(e) => setEditData({ ...editData, productprice: e.target.value })}
                                className="edit-input"
                              />
                            </td>
                            <td className="table-cell">
                              <input
                                type="text"
                                value={editData.productavalible}
                                onChange={(e) => setEditData({ ...editData, productavalible: e.target.value })}
                                className="edit-input"
                              />
                            </td>
                            <td className="table-cell">
                              <div className="action-buttons">
                                <button
                                  onClick={() => handleSaveEdit(product.id)}
                                  className="action-btn save-btn"
                                  title="Save"
                                >
                                  <Check size={18} />
                                </button>
                                <button
                                  onClick={() => setEditingId(null)}
                                  className="action-btn cancel-btn"
                                  title="Cancel"
                                >
                                  <X size={18} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ) : (
                          <tr key={product.id} className="table-row">
                            <td className="table-cell">{product.productname}</td>
                            <td className="table-cell">${product.productprice}</td>
                            <td className="table-cell">
                              <span
                                className={`availability-badge ${
                                  String(product.productavalible).toLowerCase() === "in stock" ? "in-stock" : "out-stock"
                                }`}
                              >
                                {product.productavalible}
                              </span>
                            </td>
                            <td className="table-cell">
                              <div className="action-buttons">
                                <button
                                  onClick={() => handleEdit(product)}
                                  className="action-btn edit-btn"
                                  title="Edit"
                                >
                                  <Edit2 size={18} />
                                </button>
                                <button
                                  onClick={() => handleDelete(product.id)}
                                  className="action-btn delete-btn"
                                  title="Delete"
                                >
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ),
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
