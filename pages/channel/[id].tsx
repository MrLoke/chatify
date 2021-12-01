import type { NextPage } from 'next'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import ChannelBar from 'components/ChannelBar/ChannelBar'
import ContentContainer from 'components/ContentContainer/ContentContainer'
import SideBar from 'components/SideBar/SideBar'
import { collection, getDocs } from '@firebase/firestore'
import { db } from 'firebase-config'

const Channel: NextPage = () => {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>Chatify | {router.query.name}</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='flex h-screen'>
        <SideBar />
        <ChannelBar />
        <ContentContainer />
      </div>
    </>
  )
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   console.log(context)
//   const channels: any = []

//   const querySnapshot = await getDocs(collection(db, 'channels'))

//   querySnapshot.forEach((doc) => {
//     channels.push({
//       ...doc.data(),
//       id: doc.id,
//     })
//   })

//   return {
//     props: { channels },
//   }
// }

export default Channel