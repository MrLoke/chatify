import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Channel from 'components/Channel/Channel'
import { createMockRouter } from 'test-utils/createMockRouter'
import { RouterContext } from 'next/dist/shared/lib/router-context'

describe('Channel', () => {
  const channelId = '9yayD50dF36qctMimCqT'
  const channelName = 'React.js'

  it('Should push router to channel after click', async () => {
    const router = createMockRouter({
      query: { name: 'React.js' },
      pathname: `/channel/9yayD50dF36qctMimCqT`,
    })

    render(
      <RouterContext.Provider value={router}>
        <Channel id={channelId} channelName={channelName} />
      </RouterContext.Provider>
    )

    userEvent.click(screen.getByTestId('push-to-channel'))
    expect(router.push).toHaveBeenCalledWith({
      pathname: '/channel/9yayD50dF36qctMimCqT',
      query: { name: 'React.js' },
    })
  })
})
