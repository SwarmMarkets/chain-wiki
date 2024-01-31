import HistoryChanges from '@src/components/History/HistoryChanges';
import Flex from '@src/components/ui/Flex';
import articleHistoryMock from '@src/shared/consts/articleHistoryMock';
import { HistoryItem, HistoryItemIpfsData } from '@src/shared/types/history';
import { useStorage } from '@thirdweb-dev/react';
import queryString from 'query-string';
import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

const HistoryDifference = () => {
  const storage = useStorage();
  const location = useLocation();
  const searchParams = useMemo(
    () => queryString.parse(location.search),
    [location.search]
  );
  const [fullArticlesData, setFullArticlesData] = useState<
    (HistoryItemIpfsData & HistoryItem)[]
  >([]);

  useEffect(() => {
    const oldToken = articleHistoryMock.find(
      (item) => item.id === Number(searchParams.oldTokenId)
    );

    const newToken = articleHistoryMock.find(
      (item) => item.id === Number(searchParams.newTokenId)
    );

    if (!oldToken || !newToken) {
      return;
    }

    const tokens = [oldToken, newToken];

    (async function () {
      const promises = tokens.map((item) => storage?.downloadJSON(item.newURI));

      const additionalData = await Promise.all(promises);

      const fullData = tokens.map((item, index) => ({
        ...item,
        ...additionalData[index],
      }));

      setFullArticlesData(fullData);
    })();
  }, [searchParams, storage]);

  return (
    <>
      {fullArticlesData.length > 0 && (
        <>
          <Flex>
            {fullArticlesData.map((article) => (
              <Flex
                flex={1}
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                key={article.id}
              >
                <span>
                  Revision as of {new Date(article.updatedAt).toLocaleString()}
                </span>
                <span>{article.editor}</span>
              </Flex>
            ))}
          </Flex>
          <HistoryChanges
            oldHtml={fullArticlesData[0].htmlContent}
            newHtml={fullArticlesData[1].htmlContent}
          />
        </>
      )}
    </>
  );
};

export default HistoryDifference;
