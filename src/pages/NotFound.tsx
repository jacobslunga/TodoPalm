import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center space-y-4">
      <h1 className="text-5xl md:text-7xl lg:text-9xl font-semibold">404</h1>
      <p className="text-lg text-muted-foreground">Page Not Found</p>
      <Link to="/" className="text-primary underline">
        <Button>Go Back to Home</Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
