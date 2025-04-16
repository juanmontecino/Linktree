import { User, Link } from "@prisma/client"

export type MoreInfoProfileProps = {
  user: User  & {links: Link[]}
}