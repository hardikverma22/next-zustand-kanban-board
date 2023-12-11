"use client";
import {Button} from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {ReactNode} from "react";

type CustpmDialogProps = {
  targetComponent: ReactNode;
  dialogTitle: string;
  dialogDescription?: string;

  formName: string;
  submitBtnText: string;
  children: ReactNode;
};

const CustomDialog = ({
  targetComponent,
  dialogTitle,
  dialogDescription,
  formName,
  submitBtnText,
  children,
}: CustpmDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{targetComponent}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          {dialogDescription && <DialogDescription>{dialogDescription}</DialogDescription>}
        </DialogHeader>
        {children}
        <DialogFooter>
          <DialogTrigger>
            <Button type="submit" form={formName}>
              {submitBtnText}
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
