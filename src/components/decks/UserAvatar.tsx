import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/8bit/avatar";

interface UserAvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
}

export default function UserAvatar({
  src,
  alt = "User avatar",
  fallback = "PF",
}: UserAvatarProps) {
  return (
    <Avatar>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
}
