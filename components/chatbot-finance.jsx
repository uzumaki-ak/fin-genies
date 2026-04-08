"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { X, MessageCircle, Send, Loader2, ArrowDownCircleIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useChat } from "@ai-sdk/react";
import { useEffect, useRef, useState } from "react";

export default function Chat() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const scrollRef = useRef(null);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
    reload,
    error,
  } = useChat({ api: "/api/gemini" });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const toggleChat = () => setIsChatOpen((prev) => !prev);

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-2 right-4 z-50"
        >
          <Button
            onClick={toggleChat}
            size="icon"
            className="size-14 rounded-full p-2 shadow-lg"
          >
            {!isChatOpen ? <MessageCircle className="size-7" /> : <ArrowDownCircleIcon />}
          </Button>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 16 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-4 z-50 w-[95%] md:w-[500px]"
          >
            <Card className="border-2">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-lg font-bold">Chat With Finance Mang</CardTitle>
                <Button onClick={toggleChat} size="sm" variant="ghost" className="px-2 py-0">
                  <X className="size-4" />
                  <span className="sr-only">Close chat</span>
                </Button>
              </CardHeader>

              <CardContent>
                <ScrollArea className="h-[320px] pr-4">
                  {messages.length === 0 && (
                    <div className="mt-32 flex w-full items-center justify-center text-sm text-gray-400">
                      Ask anything about your finances.
                    </div>
                  )}

                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`mb-4 ${message.role === "user" ? "text-right" : "text-left"}`}
                    >
                      <div
                        className={`inline-block rounded-lg p-3 ${
                          message.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            code({ inline, children, ...props }) {
                              return inline ? (
                                <code {...props} className="rounded bg-gray-200 px-1">
                                  {children}
                                </code>
                              ) : (
                                <pre {...props} className="rounded bg-gray-200 px-2 py-1">
                                  <code>{children}</code>
                                </pre>
                              );
                            },
                            ul: ({ children }) => <ul className="ml-4 list-disc">{children}</ul>,
                            ol: ({ children }) => (
                              <ol className="ml-4 list-decimal">{children}</ol>
                            ),
                          }}
                        >
                          {message.content}
                        </ReactMarkdown>
                      </div>
                    </div>
                  ))}

                  {isLoading && (
                    <div className="flex w-full items-center justify-center gap-3">
                      <Loader2 className="h-5 w-5 animate-spin text-primary" />
                      <button className="underline" type="button" onClick={() => stop()}>
                        Cancel
                      </button>
                    </div>
                  )}

                  {error && (
                    <div className="flex w-full items-center justify-center gap-3">
                      <div>Could not generate a reply.</div>
                      <button className="underline" type="button" onClick={() => reload()}>
                        Try again
                      </button>
                    </div>
                  )}

                  <div ref={scrollRef} />
                </ScrollArea>
              </CardContent>

              <CardFooter>
                <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
                  <Input
                    value={input}
                    onChange={handleInputChange}
                    className="flex-1"
                    placeholder="Ask about your accounts, budget, or expenses"
                    disabled={isLoading}
                  />
                  <Button
                    type="submit"
                    className="size-9"
                    disabled={isLoading || !input.trim()}
                    size="icon"
                  >
                    <Send className="size-4" />
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
