import { CardBody, CardHeader, Card as HeroCard } from '@heroui/card'
import { Divider } from '@heroui/divider'

interface Props {
  author: string | null
  title: string
  description: string | null
}

export default function BlogPost({ author, title, description }: Props) {
  return (
    <HeroCard className="max-w-[400px] m-2">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col items-start">
          <p>{author}</p>
          <p className="text-small text-default-500">{title}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>{description}</p>
      </CardBody>
      <Divider />
      {/* <CardFooter>
        <Link isExternal showAnchorIcon href="https://github.com/heroui-inc/heroui">
          Visit source code on GitHub.
        </Link>
      </CardFooter> */}
    </HeroCard>
  )
}
