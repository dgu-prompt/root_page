"use client";

import { LogOut } from "lucide-react";
import { Icon } from "@chakra-ui/react";
import {
  MenuContent,
  MenuItem,
  MenuItemGroup,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu";
import { logout } from "@/app/(auth)/_actions/auth";

export default function LogoutMenu({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MenuRoot positioning={{ placement: "bottom-end" }}>
      <MenuTrigger rounded="full">{children}</MenuTrigger>
      <MenuContent zIndex={2200}>
        <MenuItemGroup>
          <MenuItem onClick={logout} value="logout">
            <Icon>
              <LogOut />
            </Icon>
            로그아웃
          </MenuItem>
        </MenuItemGroup>
      </MenuContent>
    </MenuRoot>
  );
}
