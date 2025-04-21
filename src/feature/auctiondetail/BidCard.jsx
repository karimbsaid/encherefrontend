/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Card from "../../components/Card";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { HiClock } from "react-icons/hi2";
import Badge from "../../components/Badge";
import { placeBid } from "../../service/apiAuction";
import { useAuth } from "../../context/authContext";

export default function BidCard({ auction }) {
  const [bidAmount, setBidAmount] = useState("");
  const [bidError, setBidError] = useState("");
  const [bidSuccess, setBidSuccess] = useState(false);
  const currentBid = auction.bids?.length
    ? auction.bids[0].amount
    : auction.startPrice;

  const { user } = useAuth();

  const handleBidSubmit = async (e) => {
    e.preventDefault();
    setBidError("");
    setBidSuccess(false);

    const amount = Number.parseFloat(bidAmount);

    if (isNaN(amount)) {
      setBidError("Please enter a valid amount");
      return;
    }

    if (amount <= currentBid) {
      setBidError(
        `Your bid must be higher than the current bid ($${currentBid})`
      );
      return;
    }

    await placeBid(auction.id, user.token, amount);

    setBidSuccess(true);
  };
  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Current Bid</h3>
          <Badge
            variant="outline"
            className="flex items-center gap-1 bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300"
            icon={HiClock}
            text="today"
          />
        </div>

        <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
          ${currentBid}
        </div>

        <form onSubmit={handleBidSubmit} className="space-y-4">
          <div>
            <div className="relative">
              $
              <Input
                type="number"
                placeholder="Enter your bid"
                className="pl-9"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                min={1}
                step="1"
              />
            </div>
            {bidError && (
              <p className="mt-1 text-sm text-red-600">{bidError}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800"
            label="Place Bid"
          />
        </form>

        <p className="text-xs text-muted-foreground">
          By placing a bid, you agree to our terms and conditions.
        </p>
      </div>
    </Card>
  );
}
