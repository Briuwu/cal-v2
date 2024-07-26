"use client";

import { Loader } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Questions } from "@/types";
import { toast } from "sonner";

const formSchema = z.object({
  answer: z.string().min(2),
});

type Props = {
  data: Questions;
  onCorrect: () => void;
  onWrong: () => void;
  answer: string;
};

export const GameQuestion = ({ data, onCorrect, onWrong, answer }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      answer: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    let sanitizedAnswer = values.answer.toLowerCase().replace(/\s/g, "");
    let sanitizedCorrectAnswer = answer.toLowerCase().replace(/\s/g, "");

    if (sanitizedAnswer === sanitizedCorrectAnswer) {
      onCorrect();
      form.reset();
      toast.success("Correct answer!");
    } else {
      onWrong();
      form.reset();
      toast.error("Wrong answer!");
    }
  }

  return (
    <>
      <div className="rounded bg-white p-5 opacity-0" id="gameQuestion">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 text-center"
          >
            <FormField
              control={form.control}
              name="answer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">{data.question}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your answer"
                      {...field}
                      className="mx-auto max-w-80 text-center text-sm"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="bg-green-500 text-sm font-bold uppercase hover:bg-opacity-80"
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
      <h2
        id="gameCompleted"
        className="flex flex-col items-center justify-center gap-2 rounded bg-white p-5 text-center font-bold uppercase opacity-0"
      >
        Game Complete! Proceeding to next level...{" "}
        <Loader className="animate-spin" />
      </h2>
    </>
  );
};