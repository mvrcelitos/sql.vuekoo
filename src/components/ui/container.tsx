import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

export type ContainerProps = {
   className?: string;
} & (ContainerPropsAsChild | ContainerPropsAsParent);

type ContainerPropsAsChild = {
   asChild: true;
   children: JSX.Element;
};
type ContainerPropsAsParent = {
   asChild?: false;
   children?: React.ReactNode;
};

export const Container = ({ className, asChild, ...props }: ContainerProps) => {
   const Comp = asChild ? Slot : "main";
   return <Comp className={cn("flex flex-1 flex-col gap-4", className)} {...props} />;
};
