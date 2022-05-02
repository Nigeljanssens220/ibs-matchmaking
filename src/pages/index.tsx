import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import StatCards from '@/components/StatCards'
import Typography from '@/components/Typography'
import type { NextPage } from 'next'

const Home: NextPage = () => {
    return (
        <div>
            <Header />
            <Hero />
            {/* hard-coded for now */}
            <StatCards
                statKey1="Match Rate"
                statValue1="79 %"
                statKey2="Users"
                statValue2="200k"
                statKey3="Overall rating"
                statValue3="4.4 out of 5"
            >
                <Typography
                    variant="lg"
                    component="h3"
                    weight="medium"
                    className="text-white"
                >
                    Check our awesome stats!
                </Typography>
                <Typography
                    className="mt-3 text-white"
                    variant="base"
                    component="p"
                    weight="thin"
                >
                    Here at Isatis Business Solutions, we take proper care of
                    your future. We are the best matchmaking service in the
                    whole wide world. You should totally try us!
                </Typography>
            </StatCards>
            <Footer>
                © Isatis Business Solutions 2022. All Rights Reserved.
            </Footer>
        </div>
    )
}

export default Home
