import React from 'react';
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Icons } from "../icons"
import { siteConfig } from '@/config/site';

const RulesDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Icons.help className="h-5 w-5" />
          <span className="sr-only">Open rules</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Information</DialogTitle>
        </DialogHeader>
        <div className="max-h-[70vh] overflow-y-auto">
          {siteConfig.rules.sections.map((section, index) => (
            <section key={index} className="mb-4">
              <h3 className="text-lg font-semibold mb-2">{section.title}</h3>
              <ul className="list-disc pl-5 space-y-1">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RulesDialog;