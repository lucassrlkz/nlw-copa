import { PrismaClient } from '@prisma/client'
import ShortUniqueId from 'short-unique-id'

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data:{
      name:'John Doe',
      email:'john@doe.com',
      avatarUrl:'https://github.com/lucassrlkz.png',
    }
  })
  const generate = new ShortUniqueId({length:6})

  const pools = await prisma.pool.create({
    data: {
      title: 'bolao',
      code: generate(),
      ownerId: user.id,

      participants:{
        create:{
          userId: user.id,
        }
      }
    }
  })

  await prisma.game.create({
    data:{
      date:'2022-11-04T19:54:56.500Z',
      firstTeamCountryCode:'DE',
      secondTeamCountryCode:'FR',
  }})

  await prisma.game.create({
    data:{
      date:'2022-11-03T19:54:56.500Z',
      firstTeamCountryCode:'BR',
      secondTeamCountryCode:'AR',

      guesses:{
        create:{
          firstTeamPoints:2,
          secondTeamPoints:1,
          
          participant:{
            connect:{
              userId_poolId:{
                userId: user.id,
                poolId: pools.id
              }
            }
          }
        }
      }
  }})
  
}
main()