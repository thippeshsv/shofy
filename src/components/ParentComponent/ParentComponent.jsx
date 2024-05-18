import React from 'react'

const ParentComponent = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
      // Fetch product data from backend API
      fetch('http://localhost:3001/products')
        .then(response => response.json())
        .then(data => {
          // Set product data in state
          setProducts(data);
        })
        .catch(error => {
          console.error('Error fetching products:', error);
        });
    }, []);
  
    return (
      <div>
        {/* Render NewCollection component and pass product data as prop */}
        <NewCollection products={products} />
      </div>
    )
}

export default ParentComponent
