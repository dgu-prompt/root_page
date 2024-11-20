import { DataListItem, DataListRoot } from "@/components/ui/data-list";
import { SkeletonText } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Card, SimpleGrid } from "@chakra-ui/react";
import { useEffect } from "react";

const ControlCardSkeletonView = () => {
  return (
    <Card.Root>
      <Card.Header flex="1">
        <SimpleGrid columnGap="6" gridTemplateColumns="1fr auto" rowGap="4">
          <SkeletonText height="6" noOfLines={1} />
          <Switch />
          <SkeletonText gap="2" noOfLines={3} />
        </SimpleGrid>
      </Card.Header>
      <Card.Body>
        <DataListRoot orientation="horizontal">
          {Array.from({ length: 4 }).map((_, index) => (
            <DataListItem
              grow
              key={index}
              label={<SkeletonText noOfLines={1} />}
              value={<SkeletonText noOfLines={1} />}
            />
          ))}
        </DataListRoot>
      </Card.Body>
    </Card.Root>
  );
};

export const ControlGridSkeletonView = () => {
  useEffect(() => {
    console.log("ControlGridSkeletonView rendered");
  }, []);

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="2">
      {Array.from({ length: 15 }).map((_, index) => (
        <ControlCardSkeletonView key={index} />
      ))}
    </SimpleGrid>
  );
};

export default ControlGridSkeletonView;
