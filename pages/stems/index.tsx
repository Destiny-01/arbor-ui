import { Box, Container, Grid, Typography } from '@mui/material'
import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import PropTypes from 'prop-types'
import StemCard from '../../components/StemCard'
import type { IStemDoc } from '../../models/stem.model'
import { indexStyles as styles } from '../../styles/Stems.styles'
import { get } from '../../utils/http'

const propTypes = {
	data: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.string.isRequired,
		}),
	),
}

type StemsPageProps = PropTypes.InferProps<typeof propTypes>

const StemsPage: NextPage<StemsPageProps> = props => {
	const { data } = props

	return (
		<>
			<Head>
				<title>Arbor | Explore The StemPool</title>
			</Head>
			<Container maxWidth="xl" className="content-container">
				{data ? (
					<>
						<Typography variant="h4" component="h1" sx={styles.title}>
							Plunge Into The StemPool
						</Typography>
						<Container maxWidth="sm">
							<Typography variant="h5" sx={styles.subtitle}>
								Explore the stem pool for unique music stems from the artist community, upload your own, or grab a few
								and start a new project with them.
							</Typography>
						</Container>
						{data.length > 0 ? (
							<Grid container spacing={4}>
								{data.map((stem: any) => (
									<Grid item sm={6} md={4} key={stem._id}>
										<StemCard details={stem} />
									</Grid>
								))}
							</Grid>
						) : (
							<Box sx={styles.noProjects}>
								<Typography sx={styles.noProjectsMsg}>No stems to show. Upload one!</Typography>
							</Box>
						)}
					</>
				) : (
					<Typography sx={styles.noProjects}>Something went wrong. Try refreshing.</Typography>
				)}
			</Container>
		</>
	)
}

StemsPage.propTypes = propTypes

export const getServerSideProps: GetServerSideProps = async () => {
	// Get all Stems
	const res = await get(`/stems`)
	const data: IStemDoc[] | null = res.success ? res.data : null
	return {
		props: {
			data,
		},
	}
}

export default StemsPage
