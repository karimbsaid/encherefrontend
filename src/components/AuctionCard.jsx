import { useNavigate } from "react-router-dom";

const AuctionCard = ({ auction }) => {
  const navigate = useNavigate();
  const handleNavigateAuctionDetail = () => {
    navigate(auction.id);
  };

  const getTimeSinceCreated = (createdAt) => {
    const now = Date.now();
    const created = new Date(createdAt).getTime();
    const diffMs = now - created;

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    return "Just now";
  };

  return (
    <div className="rounded-xl border bg-white shadow transition-all hover:shadow-md dark:bg-gray-900">
      <div className="relative">
        <a onClick={handleNavigateAuctionDetail}>
          <div className="aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-800">
            <img
              src={auction.images[0] || "/placeholder.svg"}
              alt={auction.title}
              className="h-full w-full object-cover transition-transform hover:scale-105"
            />
          </div>
        </a>

        {auction.category && (
          <div className="absolute left-2 top-2">
            <span className="rounded bg-gray-200 px-2 py-0.5 text-xs font-medium dark:bg-gray-700 dark:text-white">
              {auction.category}
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <a onClick={handleNavigateAuctionDetail} className="hover:underline">
          <h3 className="line-clamp-1 font-semibold text-gray-800 dark:text-white">
            {auction.title}
          </h3>
        </a>

        <div className="mt-2 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Current Bid
            </p>
            <p className="text-lg font-bold text-purple-600 dark:text-purple-400">
              ${auction.currentBid.toLocaleString()}
            </p>
          </div>

          {auction.timeRemaining && (
            <div className="text-right">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Time Left
              </p>
              <p className="flex items-center text-sm font-medium text-red-600 dark:text-red-400">
                <Clock className="mr-1 h-3 w-3" />
                {getTimeSinceCreated(auction.createdAt)}
              </p>
            </div>
          )}
        </div>

        <a
          onClick={handleNavigateAuctionDetail}
          className="mt-3 inline-block w-full rounded-md bg-purple-600 px-4 py-2 text-center text-white hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800"
        >
          Place Bid
        </a>
      </div>
    </div>
  );
};

export default AuctionCard;
