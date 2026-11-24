
async function loadProducts() {
  const productContainer = document.getElementById("products");

  if (!productContainer) return;

  productContainer.innerHTML = "<p>กำลังโหลดสินค้า...</p>";

  const { data, error } = await supabaseClient
    .from("products")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    productContainer.innerHTML =
      "<p>ไม่สามารถโหลดสินค้าได้ กรุณาลองใหม่</p>";
    console.error(error);
    return;
  }

  if (!data || data.length === 0) {
    productContainer.innerHTML =
      "<p class='empty'>ยังไม่มีสินค้าในร้าน</p>";
    return;
  }

  productContainer.innerHTML = "";

  data.forEach(product => {
    const card = document.createElement("div");
    card.className = "card";

    const name = document.createElement("h3");
    name.textContent = product.name;

    const description = document.createElement("p");
    description.textContent = product.description || "";

    const price = document.createElement("p");
    price.className = "price";
    price.textContent =
      Number(product.price).toLocaleString("th-TH") + " บาท";

    const stock = document.createElement("p");
    stock.textContent = "คงเหลือ: " + product.stock;

    card.append(name, description, price, stock);
    productContainer.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", loadProducts);
