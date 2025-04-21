import { useEffect, useState } from "react";
import Card from "../../components/Card";
import DropDown from "../../components/DropDown";
import Input from "../../components/Input";
import { getAllCategory, getAllConditions } from "../../service/apiAuction";

const ItemDetails = ({ formData, setFormData, token, isEdit }) => {
  const [categories, setCategories] = useState([]);
  const [conditions, setConditions] = useState([]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(isEdit ? { updated: true } : {}),
    }));
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getAllCategory(token);
      setCategories(categories);
    };
    const fetchConditions = async () => {
      const conditions = await getAllConditions(token);
      setConditions(conditions);
    };
    if (token) {
      fetchCategories();
      fetchConditions();
    }
  }, [token]);

  return (
    <Card>
      <h1 className="text-3xl font-bold">Item Details</h1>
      <p className="mt-2 text-muted-foreground">
        Provide information about the item you're selling.
      </p>
      <div className="space-y-4">
        <div className="space-y-2">
          <Input
            label="Title"
            id="title"
            name="title"
            placeholder="Enter a descriptive title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Describe your item in detail"
            rows={5}
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <DropDown
            value={formData.category}
            onValueChange={(v) => {
              setFormData((prev) => ({ ...prev, category: v }));
            }}
          >
            <DropDown.Button label="Categories" />
            <DropDown.Content>
              {categories.map((categorie) => (
                <DropDown.Item key={categorie.id} value={categorie.id}>
                  {categorie.name}
                </DropDown.Item>
              ))}
            </DropDown.Content>
          </DropDown>

          <DropDown
            value={formData.condition}
            onValueChange={(v) => {
              setFormData((prev) => ({ ...prev, condition: v }));
            }}
          >
            <DropDown.Button label="condition" />
            <DropDown.Content>
              {conditions.map((cond) => (
                <DropDown.Item key={cond.id} value={cond.id}>
                  {cond.name}
                </DropDown.Item>
              ))}
            </DropDown.Content>
          </DropDown>
        </div>
      </div>
    </Card>
  );
};

export default ItemDetails;
