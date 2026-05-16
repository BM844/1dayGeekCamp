import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 p-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>shadcn/ui サンプル</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Input placeholder="テキストを入力してください" />
          <div className="flex gap-2">
            <Button>ボタン</Button>
            <Button variant="outline">アウトライン</Button>
            <Button variant="destructive">削除</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
