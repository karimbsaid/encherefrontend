import Card from "../../components/Card";
import Input from "../../components/Input";
import { HiCalendar, HiCurrencyDollar } from "react-icons/hi2";

const AuctionSettings = ({ formData, setFormData, isEdit }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(isEdit ? { updated: true } : {}),
    }));
  };

  return (
    <Card>
      <h1>Auction Settings</h1>
      <p>Set your starting price and auction duration.</p>
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="relative">
            <Input
              icon={HiCurrencyDollar}
              id="startPrice"
              label="Starting Price ($)"
              name="startPrice"
              type="number"
              placeholder="0.00"
              className="pl-9"
              value={formData.startPrice}
              onChange={handleInputChange}
              min="0.01"
              step="0.01"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="relative">
            <Input
              icon={HiCalendar}
              label="End Date & Time"
              id="endTime"
              name="endTime"
              type="datetime-local"
              className="pl-9"
              value={formData.endTime}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AuctionSettings;
