import React from "react";
import Card from "../../components/Card";
export default function SellerInformation({ auction }) {
  console.log(auction);
  return (
    <Card>
      <h3 className="mb-4 text-lg font-medium">Seller Information</h3>
      <div className="flex items-center space-x-3">
        {/* <Avatar>
      <AvatarImage
        src={auction.seller.avatar}
        alt={auction.seller.name}
      />
      <AvatarFallback>{auction.seller.name.charAt(0)}</AvatarFallback>
    </Avatar> */}
        <div>
          <p className="font-medium">{auction.seller.userName}</p>
        </div>
      </div>
      {/* <Button variant="outline" className="mt-4 w-full">
    Contact Seller
  </Button> */}
    </Card>
  );
}
