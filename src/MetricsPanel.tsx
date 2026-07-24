import styles from "./App.module.css";
import type { MemoMetrics } from "./metrics";

type Props = {
  metrics: MemoMetrics;
  createdAt: number;
  updatedAt: number;
};

export default function MetricsPanel({ metrics, createdAt, updatedAt }: Props) {
  const readingTime =
    metrics.readingSeconds < 60
      ? `約 ${metrics.readingSeconds} 秒`
      : `約 ${Math.floor(metrics.readingSeconds / 60)} 分 ${
          metrics.readingSeconds % 60
        } 秒`;

  return (
    <aside className={styles.metricsPanel} aria-label="テキストメトリクス">
      <section>
        <h2 className={styles.metricsTitle}>基本</h2>
        <dl className={styles.metricsList}>
          <dt className={styles.metricsLabel}>文字数</dt>
          <dd className={styles.metricsValue}>
            {metrics.characters.toLocaleString()}
          </dd>
          <dt className={styles.metricsLabel}>文字数（空白除く）</dt>
          <dd className={styles.metricsValue}>
            {metrics.charactersWithoutSpaces.toLocaleString()}
          </dd>
          <dt className={styles.metricsLabel}>単語数</dt>
          <dd className={styles.metricsValue}>
            {metrics.words.toLocaleString()}
          </dd>
          <dt className={styles.metricsLabel}>文数</dt>
          <dd className={styles.metricsValue}>
            {metrics.sentences.toLocaleString()}
          </dd>
          <dt className={styles.metricsLabel}>段落数</dt>
          <dd className={styles.metricsValue}>
            {metrics.paragraphs.toLocaleString()}
          </dd>
          <dt className={styles.metricsLabel}>行数</dt>
          <dd className={styles.metricsValue}>
            {metrics.lines.toLocaleString()}
          </dd>
        </dl>
      </section>

      <section>
        <h2 className={styles.metricsTitle}>文字種</h2>
        <dl className={styles.metricsList}>
          <dt className={styles.metricsLabel}>漢字</dt>
          <dd className={styles.metricsValue}>
            {metrics.kanji.toLocaleString()}
          </dd>
          <dt className={styles.metricsLabel}>ひらがな</dt>
          <dd className={styles.metricsValue}>
            {metrics.hiragana.toLocaleString()}
          </dd>
          <dt className={styles.metricsLabel}>カタカナ</dt>
          <dd className={styles.metricsValue}>
            {metrics.katakana.toLocaleString()}
          </dd>
          <dt className={styles.metricsLabel}>英字</dt>
          <dd className={styles.metricsValue}>
            {metrics.alphabets.toLocaleString()}
          </dd>
          <dt className={styles.metricsLabel}>数字</dt>
          <dd className={styles.metricsValue}>
            {metrics.digits.toLocaleString()}
          </dd>
          <dt className={styles.metricsLabel}>記号・句読点</dt>
          <dd className={styles.metricsValue}>
            {metrics.symbols.toLocaleString()}
          </dd>
          <dt className={styles.metricsLabel}>空白</dt>
          <dd className={styles.metricsValue}>
            {metrics.spaces.toLocaleString()}
          </dd>
          <dt className={styles.metricsLabel}>その他</dt>
          <dd className={styles.metricsValue}>
            {metrics.others.toLocaleString()}
          </dd>
        </dl>
      </section>

      <section>
        <h2 className={styles.metricsTitle}>分析</h2>
        <dl className={styles.metricsList}>
          <dt className={styles.metricsLabel}>平均文長</dt>
          <dd className={styles.metricsValue}>
            {metrics.averageSentenceLength} 字
          </dd>
          <dt className={styles.metricsLabel}>最長文</dt>
          <dd className={styles.metricsValue}>
            {metrics.longestSentenceLength.toLocaleString()} 字
          </dd>
          <dt className={styles.metricsLabel}>平均段落長</dt>
          <dd className={styles.metricsValue}>
            {metrics.averageParagraphLength} 字
          </dd>
          <dt className={styles.metricsLabel}>原稿用紙</dt>
          <dd className={styles.metricsValue}>{metrics.manuscriptPages} 枚</dd>
          <dt className={styles.metricsLabel}>読了時間</dt>
          <dd className={styles.metricsValue}>{readingTime}</dd>
          <dt className={styles.metricsLabel}>バイト数</dt>
          <dd className={styles.metricsValue}>
            {metrics.bytes.toLocaleString()} B
          </dd>
        </dl>
      </section>

      <section>
        <h2 className={styles.metricsTitle}>情報</h2>
        <dl className={styles.metricsList}>
          <dt className={styles.metricsLabel}>作成日時</dt>
          <dd className={styles.metricsValue}>
            {new Date(createdAt).toLocaleString("ja-JP")}
          </dd>
          <dt className={styles.metricsLabel}>最終更新</dt>
          <dd className={styles.metricsValue}>
            {new Date(updatedAt).toLocaleString("ja-JP")}
          </dd>
        </dl>
      </section>
    </aside>
  );
}
