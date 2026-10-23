import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/8bit/avatar";

interface DashboardAvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
}

export default function DashboardAvatar({
  src,
  alt = "User avatar",
  fallback = "PF",
}: DashboardAvatarProps) {
  return (
    <Avatar>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
}
