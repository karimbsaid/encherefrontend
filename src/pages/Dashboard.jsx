import React, { useContext, useEffect, useState } from "react";
import axiosInstance from "../service/axiosInstance";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/Tab";
import AuctionCard from "../components/AuctionCard";
import AuctionCardOwner from "../components/AuctionCardOwner";
import { useNavigate } from "react-router-dom";
import { Modal, ModalContext } from "../components/Modal";
import ConfirmDelete from "../components/ConfirmDelete";
import Button from "../components/Button";

export default function Dashboard() {
  return (
    <Modal>
      <DashboardContent />
    </Modal>
  );
}

function DashboardContent() {
  const [myBidsAuctions, setAuctionsBid] = useState([]);
  const [myAuctions, setMyAuctions] = useState([]);
  const [auctionTodelete, setAuctionDelete] = useState("");
  const { open, close } = useContext(ModalContext);
  const navigate = useNavigate();

  useEffect(() => {
    const getMyBidAuctions = async () => {
      const response = await axiosInstance.get("/api/auctions/mybids");
      setAuctionsBid(response);
    };
    const getMyAuctions = async () => {
      const response = await axiosInstance.get("/api/auctions/myauctions");
      setMyAuctions(response);
    };
    getMyBidAuctions();
    getMyAuctions();
  }, []);

  const handleOpenModalDelete = (auctionId) => {
    setAuctionDelete(auctionId);
    open("delete-confirm");
  };

  const handleDeleteAuction = async () => {
    await axiosInstance.delete(`/api/auctions/${auctionTodelete}`);
    setMyAuctions((prev) => prev.filter((a) => a.id !== auctionTodelete));
    close(); // ferme le modal après suppression
  };

  const handleEditAuctionNavigation = (auctionId) => {
    navigate(`/auctions/update/${auctionId}`);
  };

  return (
    <>
      <Tabs defaultValue="mybids" className="mb-8">
        <TabsList className="mb-4 flex  w-full overflow-x-auto">
          <TabsTrigger value="mybids">my bids auctions</TabsTrigger>
          <TabsTrigger value="myauctions">my auctions</TabsTrigger>
        </TabsList>
        <TabsContent
          value="mybids"
          className="grid grid-cols-1 md:grid-cols-4 gap-5"
        >
          {myBidsAuctions.map((auc) => (
            <AuctionCard key={auc.id} auction={auc} />
          ))}
        </TabsContent>
        <TabsContent
          value="myauctions"
          className="grid grid-cols-1 md:grid-cols-4 gap-5"
        >
          {myAuctions.map((auc) => (
            <AuctionCardOwner
              key={auc.id}
              auction={auc}
              onDelete={() => handleOpenModalDelete(auc.id)}
              onEdit={handleEditAuctionNavigation}
            />
          ))}
          <Button onClick={() => navigate("/auctions/create")}>
            add auction
          </Button>
        </TabsContent>
      </Tabs>

      <Modal.Window name="delete-confirm">
        <ConfirmDelete
          confirmationText="SUPPRIMER"
          onClose={close}
          onConfirm={handleDeleteAuction}
        />
      </Modal.Window>
    </>
  );
}
