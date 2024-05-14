export const Title = ({ title, description }: { title: string; description: string }) => (
  <div className="flex w-full flex-col gap-1">
    <h2 className="text-h1">{title}</h2>
    <p className="text-bod1/regilar">{description}</p>
  </div>
)
