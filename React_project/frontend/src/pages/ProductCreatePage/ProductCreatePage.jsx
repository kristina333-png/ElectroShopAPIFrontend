import ProductForm from "../../components/ProductForm/ProductForm.jsx";
import SectionHeader from "../../components/SectionHeader/SectionHeader.jsx";

export default function ProductCreatePage() {
  return (
    <section>
      <SectionHeader 
        title="Добавление товара" 
        subtitle="Создание новой позиции в каталоге" 
      />
      <ProductForm />
    </section>
  );
}